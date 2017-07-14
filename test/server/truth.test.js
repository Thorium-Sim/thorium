test('truth', () => {
  expect(1 + 1 === 2).toBe(true);
});

test('arrays', () => {
  expect([true]).toContain(true);
});
