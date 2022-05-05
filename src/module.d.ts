// TODO: individual layout exports are not supported
interface GenericLayoutConstructor<T = unknown> {
  new (): HTMLElement & { render(): void } & T
  defineElement(): void
  getStyles(attrs: unknown): { id: string; css: string }
}

declare module '@openlab/alembic' {
  export * from '@openlab/alembic/layouts.js'
  export * from '@openlab/alembic/lib.js'
}

declare module '@openlab/alembic/layouts.js' {
  export const StackLayout: GenericLayoutConstructor<{ space: string }>
  export const BoxLayout: GenericLayoutConstructor
  export const CenterLayout: GenericLayoutConstructor
  export const ClusterLayout: GenericLayoutConstructor
  export const SidebarLayout: GenericLayoutConstructor
  export const SwitcherLayout: GenericLayoutConstructor
  export const CoverLayout: GenericLayoutConstructor
  export const GridLayout: GenericLayoutConstructor
  export const FrameLayout: GenericLayoutConstructor
  export const ReelLayout: GenericLayoutConstructor
  export const ImposterLayout: GenericLayoutConstructor
  export const IconLayout: GenericLayoutConstructor

  export function defineLayoutElements(): void
  export const layoutCustomElementNames: string[]
}
declare module '@openlab/alembic/layouts' {
  export * from '@openlab/alembic/layouts.js'
}

declare module '@openlab/alembic/lib.js' {
  export function addGlobalStyle(id: string, style: string): void
}
declare module '@openlab/alembic/lib' {
  export * from '@openlab/alembic/lib.js'
}
