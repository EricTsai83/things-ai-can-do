interface TextInput {
  inputs: string;
}

interface QaInput {
  inputs: {
    [key: string]: string;
  };
}

const huggingFaceApi = {
  hostname: 'https://api-inference.huggingface.co/models',
  accessToken: process.env.HUGGINGFACE_ACCESS_TOKEN,
  Header: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_ACCESS_TOKEN}`,
  },

  async getChineseWs(data: TextInput) {
    const response = await fetch(
      `${this.hostname}/ckiplab/bert-base-chinese-ws`,
      {
        headers: this.Header,
        method: 'POST',
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    return result;
  },

  async getChinesePos(data: TextInput) {
    const response = await fetch(
      `${this.hostname}/ckiplab/bert-base-chinese-pos`,
      {
        headers: this.Header,
        method: 'POST',
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    return result;
  },

  async getChineseNer(data: TextInput) {
    const response = await fetch(
      `${this.hostname}/ckiplab/bert-base-chinese-ner`,
      {
        headers: this.Header,
        method: 'POST',
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    return result;
  },

  async getChineseQA(data: QaInput) {
    const response = await fetch(
      `${this.hostname}/ckiplab/bert-base-chinese-qa`,
      {
        headers: this.Header,
        method: 'POST',
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    return result;
  },

  async getStableDiffusionImage(data: TextInput) {
    const response = await fetch(
      `${this.hostname}/runwayml/stable-diffusion-v1-5`,
      {
        headers: this.Header,
        method: 'POST',
        body: JSON.stringify(data),
      },
    );
    const result = await response.blob();
    return result;
  },

  async getImageSegmentation(data: Blob) {
    // const data = fs.readFileSync(filename);
    const response = await fetch(
      `${this.hostname}/facebook/detr-resnet-50-panoptic`,
      {
        headers: this.Header,
        method: 'POST',
        body: data,
      },
    );
    const result = await response.json();
    return result;
  },

  async getSketchClassifier(data: Blob) {
    // const data = fs.readFileSync(filename);
    const response = await fetch(
      `${this.hostname}/kmewhort/beit-sketch-classifier`,
      {
        headers: this.Header,
        method: 'POST',
        body: data,
      },
    );
    const result = await response.json();
    return result;
  },

  async getSpeechRecognition(data: Blob) {
    // const data = fs.readFileSync(filename);
    const response = await fetch(
      `${this.hostname}/jonatasgrosman/wav2vec2-large-xlsr-53-english`,
      {
        headers: this.Header,
        method: 'POST',
        body: data,
      },
    );
    const result = await response.json();
    return result;
  },

  async getCatsAndDogClassifier(data: Blob) {
    // const data = fs.readFileSync(filename);
    const response = await fetch(
      `${this.hostname}/akahana/vit-base-cats-vs-dogs`,
      {
        headers: this.Header,
        method: 'POST',
        body: data,
      },
    );
    const result = await response.json();
    return result;
  },
};

export default huggingFaceApi;
