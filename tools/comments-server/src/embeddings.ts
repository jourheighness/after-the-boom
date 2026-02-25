export interface EmbeddingProvider {
  embed(text: string): Promise<Float32Array | null>;
  embedBatch(texts: string[]): Promise<(Float32Array | null)[]>;
  dimensions: number;
  model: string;
}

export function createOllamaProvider(baseUrl: string = 'http://localhost:11434'): EmbeddingProvider {
  const model = 'bge-m3';
  const dimensions = 1024;

  async function embed(text: string): Promise<Float32Array | null> {
    try {
      const res = await fetch(baseUrl + '/api/embed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, input: text }),
      });

      if (!res.ok) {
        console.warn('[embeddings] Ollama returned', res.status, await res.text());
        return null;
      }

      const data = await res.json();
      if (!data.embeddings || !data.embeddings[0]) {
        console.warn('[embeddings] No embedding in response');
        return null;
      }

      return new Float32Array(data.embeddings[0]);
    } catch (err) {
      console.warn('[embeddings] Ollama not available:', (err as Error).message);
      return null;
    }
  }

  async function embedBatch(texts: string[]): Promise<(Float32Array | null)[]> {
    // Process with concurrency limit of 4
    const results: (Float32Array | null)[] = new Array(texts.length).fill(null);
    const concurrency = 4;

    for (let i = 0; i < texts.length; i += concurrency) {
      const batch = texts.slice(i, i + concurrency);
      const promises = batch.map((text, j) =>
        embed(text).then((emb) => {
          results[i + j] = emb;
        }),
      );
      await Promise.all(promises);
    }

    return results;
  }

  return { embed, embedBatch, dimensions, model };
}
