export const attributeShortcodes = new Map(
  Object.entries({
    's-5': 'var(--s-5)',
    's-4': 'var(--s-4)',
    's-3': 'var(--s-3)',
    's-2': 'var(--s-2)',
    's-1': 'var(--s-1)',
    s0: 'var(--s0)',
    s1: 'var(--s1)',
    s2: 'var(--s2)',
    s3: 'var(--s3)',
    s4: 'var(--s4)',
    s5: 'var(--s5)',
  })
)

export type MergedAttributes<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>
> = {
  [K in keyof T]: T[K] extends undefined
    ? K extends keyof U
      ? U[K]
      : undefined
    : T[K]
}

export function getAttributes<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>
>(defaults: T, values: U): MergedAttributes<T, U> {
  const overrides = Object.fromEntries(
    Object.entries(values)
      .map(([key, value]) => [
        key,
        typeof value === 'string' ? attributeShortcodes.get(value) : undefined,
      ])
      .filter((pair) => pair[1])
  )

  return {
    ...defaults,
    ...values,
    ...overrides,
  }
}

export function getAttribute(input: string) {
  return attributeShortcodes.get(input) ?? input
}
