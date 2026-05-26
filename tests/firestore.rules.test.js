import { describe, it, before, after, beforeEach } from 'node:test';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { readFileSync } from 'node:fs';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';

// ── Setup ──────────────────────────────────────────────────────────────────

describe('Firestore Security Rules', () => {
  let testEnv;

  before(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'la-pausa-mundial-2026',
      firestore: {
        rules: readFileSync('firestore.rules', 'utf8'),
        host: '127.0.0.1',
        port: 8080,
      },
    });
  });

  after(async () => {
    await testEnv.cleanup();
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  // ── users/{uid} ──────────────────────────────────────────────────────────

  describe('users/{uid}', () => {
    // El doc debe existir antes de cada test (allow update, no allow create)
    // Se usa una sola referencia db para evitar doble initializeFirestore
    beforeEach(async () => {
      await testEnv.withSecurityRulesDisabled(async (ctx) => {
        const db = ctx.firestore();
        await setDoc(doc(db, 'users/alice'), { nombre: 'Alice' });
        await setDoc(doc(db, 'users/bob'),   { nombre: 'Bob'   });
      });
    });

    it('permite actualizar nombre válido', async () => {
      const alice = testEnv.authenticatedContext('alice');
      await assertSucceeds(
        updateDoc(doc(alice.firestore(), 'users/alice'), { nombre: 'Alice Modificada' })
      );
    });

    it('rechaza nombre vacío', async () => {
      const alice = testEnv.authenticatedContext('alice');
      await assertFails(
        updateDoc(doc(alice.firestore(), 'users/alice'), { nombre: '' })
      );
    });

    it('rechaza nombre >40 caracteres', async () => {
      const alice = testEnv.authenticatedContext('alice');
      await assertFails(
        updateDoc(doc(alice.firestore(), 'users/alice'), { nombre: 'A'.repeat(41) })
      );
    });

    it('rechaza nombre no-string (número)', async () => {
      const alice = testEnv.authenticatedContext('alice');
      await assertFails(
        updateDoc(doc(alice.firestore(), 'users/alice'), { nombre: 42 })
      );
    });

    it('rechaza campo extra junto al nombre', async () => {
      const alice = testEnv.authenticatedContext('alice');
      // diff().affectedKeys() incluiría 'role' → falla hasOnly(['nombre'])
      await assertFails(
        updateDoc(doc(alice.firestore(), 'users/alice'), { nombre: 'Alice', role: 'admin' })
      );
    });

    it('rechaza modificar perfil ajeno', async () => {
      const alice = testEnv.authenticatedContext('alice');
      await assertFails(
        updateDoc(doc(alice.firestore(), 'users/bob'), { nombre: 'Hackeado' })
      );
    });
  });

  // ── drafts/{uid} ─────────────────────────────────────────────────────────

  describe('drafts/{uid}', () => {
    it('permite escribir draft propio', async () => {
      const alice = testEnv.authenticatedContext('alice');
      await assertSucceeds(
        setDoc(doc(alice.firestore(), 'drafts/alice'), { formacion: '4-3-3' })
      );
    });

    it('rechaza escribir draft ajeno', async () => {
      const alice = testEnv.authenticatedContext('alice');
      await assertFails(
        setDoc(doc(alice.firestore(), 'drafts/bob'), { formacion: '4-3-3' })
      );
    });
  });

  // ── ligas/{ligaId} ───────────────────────────────────────────────────────

  describe('ligas/{ligaId}', () => {
    // Estado base: alice es la única manager
    beforeEach(async () => {
      await testEnv.withSecurityRulesDisabled(async (ctx) => {
        const db = ctx.firestore();
        await setDoc(doc(db, 'ligas/liga1'), {
          managers:     ['alice'],
          managersInfo: { alice: { nombre: 'Alice' } },
        });
      });
    });

    it('manager actualiza solo su propio managersInfo', async () => {
      const alice = testEnv.authenticatedContext('alice');
      await assertSucceeds(
        updateDoc(doc(alice.firestore(), 'ligas/liga1'), {
          managersInfo: { alice: { nombre: 'Alice Actualizada' } },
        })
      );
    });

    it('manager no puede modificar managersInfo de otro uid', async () => {
      const alice = testEnv.authenticatedContext('alice');
      // diff de managersInfo mostraría 'bob' → falla hasOnly([alice.uid])
      await assertFails(
        updateDoc(doc(alice.firestore(), 'ligas/liga1'), {
          managersInfo: { alice: { nombre: 'Alice' }, bob: { nombre: 'Hackeado' } },
        })
      );
    });

    it('manager no puede borrar la lista managers', async () => {
      const alice = testEnv.authenticatedContext('alice');
      // managers cambia → ninguna condición lo permite
      await assertFails(
        updateDoc(doc(alice.firestore(), 'ligas/liga1'), {
          managers: [],
        })
      );
    });

    it('join: nuevo usuario se añade a sí mismo', async () => {
      const bob = testEnv.authenticatedContext('bob');
      await assertSucceeds(
        updateDoc(doc(bob.firestore(), 'ligas/liga1'), {
          managers:     ['alice', 'bob'],
          managersInfo: { alice: { nombre: 'Alice' }, bob: { nombre: 'Bob' } },
        })
      );
    });

    it('join: rechaza añadir a un tercero en lugar de uno mismo', async () => {
      const charlie = testEnv.authenticatedContext('charlie');
      // charlie intenta meter a bob: charlie no está en la nueva lista → falla
      await assertFails(
        updateDoc(doc(charlie.firestore(), 'ligas/liga1'), {
          managers:     ['alice', 'bob'],
          managersInfo: { alice: { nombre: 'Alice' }, bob: { nombre: 'Bob' } },
        })
      );
    });
  });

  // ── torneo/{docId} ───────────────────────────────────────────────────────

  describe('torneo/{docId}', () => {
    beforeEach(async () => {
      await testEnv.withSecurityRulesDisabled(async (ctx) => {
        await setDoc(doc(ctx.firestore(), 'torneo/estado'), {
          equipos_eliminados: [], draft_disponible: true, fase: 'grupos',
        });
      });
    });

    it('usuario autenticado puede leer torneo/estado', async () => {
      const alice = testEnv.authenticatedContext('alice');
      await assertSucceeds(
        getDoc(doc(alice.firestore(), 'torneo/estado'))
      );
    });

    it('usuario no autenticado no puede leer torneo/estado', async () => {
      const anon = testEnv.unauthenticatedContext();
      await assertFails(
        getDoc(doc(anon.firestore(), 'torneo/estado'))
      );
    });

    it('usuario autenticado no puede escribir torneo/estado', async () => {
      const alice = testEnv.authenticatedContext('alice');
      await assertFails(
        setDoc(doc(alice.firestore(), 'torneo/estado'), { draft_disponible: false })
      );
    });
  });

  // ── resultados/{docId} ───────────────────────────────────────────────────

  describe('resultados/{docId}', () => {
    beforeEach(async () => {
      await testEnv.withSecurityRulesDisabled(async (ctx) => {
        await setDoc(doc(ctx.firestore(), 'resultados/partido1'), { l: 2, v: 1 });
      });
    });

    it('usuario autenticado puede leer resultado', async () => {
      const alice = testEnv.authenticatedContext('alice');
      await assertSucceeds(
        getDoc(doc(alice.firestore(), 'resultados/partido1'))
      );
    });

    it('usuario no autenticado no puede leer resultado', async () => {
      const anon = testEnv.unauthenticatedContext();
      await assertFails(
        getDoc(doc(anon.firestore(), 'resultados/partido1'))
      );
    });

    it('usuario autenticado no puede escribir resultado', async () => {
      const alice = testEnv.authenticatedContext('alice');
      await assertFails(
        setDoc(doc(alice.firestore(), 'resultados/partido2'), { l: 1, v: 0 })
      );
    });
  });
});
