// TODO: individual layout exports are not supported
interface GenericLayoutConstructor<T = unknown> {
  new (): HTMLElement & { render(): void } & T
  defineElement(): void
  getStyles(attrs: unknown): { id: string; css: string }
}

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

/** 
  Register every Layout custom element in one go
 */
export function defineLayoutElements(): void

/** 
  `layoutMap` is a map of custom element name to Layout class
 */
export const layoutMap: Record<string, GenericLayoutConstructor | undefined>

/**
  layoutCustomElementNames is an array of all custom element names,
  useful for telling compilers (like Vue) to ignore these custom elements.
  The order of these is NOT guaranteed
 */
export const layoutCustomElementNames: string[]

/**
  Take a HTML file with some layouts in it, compute their styles
  and inject them into the document using `<!-- @openlab/alembic inject-css -->`
 */
export function injectLayoutStyles(inputHtml: string): string
