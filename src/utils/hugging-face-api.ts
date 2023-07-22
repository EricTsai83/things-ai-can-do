interface TextInput {
  inputs: string;
  options?: {
    wait_for_model: boolean;
  };
}

interface QaInput {
  inputs: {
    question: string;
    context: string;
  };
  options?: {
    wait_for_model: boolean;
  };
}

interface QaInput {
  inputs: {
    question: string;
    context: string;
  };
  options?: {
    wait_for_model: boolean;
  };
}

const huggingFaceApi = {
  hostname: '/api/huggingFace',

  async getChineseWs(data: TextInput) {
    const response = await fetch(`${this.hostname}/getChineseWs`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  },

  async getChinesePos(data: TextInput) {
    const response = await fetch(`${this.hostname}/getChinesePos`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  },

  async getChineseNer(data: TextInput) {
    const response = await fetch(`${this.hostname}/getChineseNer`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  },

  async getChineseQa(data: QaInput) {
    const response = await fetch(`${this.hostname}/getChineseQa`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  },

  async getStableDiffusionImage(data: TextInput) {
    const response = await fetch(`${this.hostname}/getStableDiffusionImage`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.blob();
    return result;
  },

  async getImageSegmentation(data: Blob) {
    const formData = new FormData();
    formData.append('file', data);
    const response = await fetch(`${this.hostname}/getImageSegmentation`, {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    return result;
  },

  async getSketchClassifier(data: Blob) {
    const formData = new FormData();
    formData.append('file', data);
    const response = await fetch(`${this.hostname}/getSketchClassifier`, {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    return result;
  },

  async getSpeechRecognition(data: Blob) {
    const formData = new FormData();
    formData.append('file', data);
    const response = await fetch(`${this.hostname}/getSpeechRecognition`, {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    return result;
  },

  async getCatsAndDogClass(data: Blob) {
    const formData = new FormData();
    formData.append('file', data);
    const response = await fetch(`${this.hostname}/getCatsAndDogClass`, {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    return result;
  },
};

export default huggingFaceApi;
