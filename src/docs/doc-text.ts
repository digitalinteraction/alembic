/** @type {string[]} */
const LOREM_WORDS = JSON.parse(
  '["a","ac","accumsan","adipiscing","aenean","aliqua","aliquam","aliquet","amet","ante","arcu","at","auctor","augue","bibendum","commodo","consectetur","convallis","curabitur","cursus","dapibus","diam","dictum","dictumst","dignissim","do","dolor","dolore","donec","dui","duis","egestas","eget","eiusmod","eleifend","elementum","elit","enim","erat","eros","est","et","etiam","eu","euismod","facilisi","facilisis","fames","faucibus","fermentum","feugiat","fringilla","fusce","gravida","habitasse","hac","hendrerit","iaculis","id","imperdiet","in","incididunt","integer","interdum","ipsum","justo","labore","lacinia","lacus","laoreet","lectus","leo","libero","ligula","lobortis","lorem","luctus","maecenas","magna","malesuada","massa","mattis","mauris","metus","mi","morbi","nam","nec","neque","nibh","nisl","non","nulla","nullam","nunc","odio","orci","ornare","pellentesque","pharetra","phasellus","placerat","platea","porta","porttitor","posuere","praesent","pretium","proin","pulvinar","purus","quam","quis","rhoncus","risus","sagittis","sapien","scelerisque","sed","sem","semper","sit","suspendisse","tellus","tempor","tempus","tincidunt","tortor","tristique","turpis","ullamcorper","ultrices","ultricies","urna","ut","varius","vehicula","vel","velit","vestibulum","vitae","viverra","volutpat","vulputate"]'
)

const defaultAttributes = {
  words: '5',
}

export interface DocTextAttributes {
  words?: string
}

export class DocText extends HTMLElement {
  textNode: Text

  static get observedAttributes() {
    return ['words']
  }

  get words() {
    return this.getAttribute('words') ?? defaultAttributes.words
  }
  set words(value) {
    if (value) this.setAttribute('words', value)
    else this.removeAttribute('words')
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    this.textNode = this.shadowRoot!.appendChild(document.createTextNode(''))
  }

  randomNumber(min: number, max: number) {
    return min + Math.round(Math.random() * (max - min))
  }

  sentenceCase(input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1)
  }

  render() {
    let range = /^(\d+),(\d+)$/
      .exec(this.words)
      ?.slice(1)
      .map((v) => parseInt(v, 10))

    if (!range) {
      const number = parseInt(this.words, 10)
      if (!Number.isNaN(number)) range = [number, number]
    }

    if (!range) {
      console.error(
        '<doc-text> invalid `range`, expected a number or a range like %o, got %o',
        '5,10',
        range
      )
      return
    }

    this.textNode.data = Array.from(
      { length: this.randomNumber(range[0], range[1]) },
      () => LOREM_WORDS[this.randomNumber(0, LOREM_WORDS.length)]
    ).join(' ')
  }
  connectedCallback() {
    this.render()
  }
  attributeChangedCallback() {
    this.render()
  }
}
