export function addGlobalStyle(id: string, style: string): void
export function trimCss(inputHtml: string): string
export class DetailsUtils extends HTMLElement {
  static defineElement(): void

  persist: string
  detailsElem: HTMLDetailsElement

  render(): void
}
