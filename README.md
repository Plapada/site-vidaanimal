# Site Vida Animal

Site institucional da **Vida Animal** — clínica veterinária 24 horas no Centro
de Jaboatão dos Guararapes/PE. Desenvolvido pela [PetForce](https://petforce.com.br).

> **Prévia, não versão final.** A página está com `noindex` de propósito.
> Ver *[O que falta para ir ao ar de verdade](#o-que-falta-para-ir-ao-ar-de-verdade)*.

**No ar em:** https://plapada.github.io/site-vidaanimal/

---

## Como rodar aqui

Não tem build, não tem dependência, não tem `npm install`. É um HTML com CSS e
JavaScript embutidos.

O jeito mais simples é abrir o arquivo direto no navegador:

```bash
open index.html
```

Se quiser servir por HTTP — necessário se for testar caminhos de assets ou
qualquer coisa que dependa de origem:

```bash
node servidor.mjs
```

Sobe em `http://127.0.0.1:5173`. Usa só módulos nativos do Node (`node:http`,
`node:fs`, `node:path`), de propósito: não toca em `node_modules`.

## Estrutura

```
index.html    o site inteiro — tokens, CSS, 8 seções e o JS
assets/       a foto real da fachada e o logo
servidor.mjs  servidor estático para revisar local
```

Por que um arquivo só: o site tem oito seções e nenhuma rota. Dividir em módulos
adicionaria uma etapa de build e um diretório de dependências para não resolver
problema nenhum. Quando houver segunda página (a do plano de saúde, provável),
vale reavaliar.

## Publicação

Cada push na `main` dispara `.github/workflows/pages.yml`, que empacota a pasta
e envia para o GitHub Pages.

Precisa de **uma configuração manual, uma única vez**:

> Settings → Pages → Build and deployment → **Source: GitHub Actions**

Sem isso o workflow falha na primeira execução.

## O que falta para ir ao ar de verdade

O detalhamento está em `PENDENCIAS.md`, fora deste repositório. O resumo dos
bloqueios:

| Bloqueio | Trava o quê |
|---|---|
| **Nome e CRMV do responsável técnico** | A seção de triagem inteira. A norma publicitária do CFMV exige nome e CRMV em orientação veterinária publicada — e essa seção é fala clínica pura |
| **Domínio** | `canonical`, Open Graph com URL real, `sitemap.xml`, `robots.txt` e a retirada do `noindex` |
| **Logo com transparência real** | O PNG atual é branco sobre preto chapado, sem canal alfa. Está funcionando por `mix-blend-mode: screen`, que é remendo: não sobrevive a fundo claro |
| **Fotos reais** | Só a fachada é verdadeira. Hero (4), os 6 cards de serviço e a institucional continuam de banco de imagem |
| **Grafia do plano de saúde** | Circula em três grafias diferentes. Enquanto não travar, o site fala "plano de saúde" sem nome |

### Nota sobre as fotos do hero

As quatro fotos ocupam a metade direita da tela e são dissolvidas por uma
máscara em degradê. Isso impõe requisitos que foto de banco quadrada não atende:

- **retrato**, não quadrado (≈1100×1400 é a proporção em uso);
- **mínimo 1600px na menor dimensão**, para retina em monitor grande;
- **assunto à direita do enquadramento** — o terço esquerdo é dissolvido, e pet
  centralizado ali some pela metade;
- **fundo calmo do lado esquerdo**, que é por onde a foto se funde ao creme.

Enquanto forem de banco, estão com `alt=""` e `aria-hidden`: um alt dizendo "na
Vida Animal" sobre foto de banco é afirmação falsa, lida em voz alta justamente
para quem mais depende dela.
