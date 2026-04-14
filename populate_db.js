const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient('https://edgdqwzpczmrsatrprxi.supabase.co', 'sb_publishable_ZMv7WBT8DU6d9uEgEaWzHA_eyWsKvj-');

const userId = '0075e479-d7ba-43cc-b564-d8783c164531';
const neighborhoods = [
    { id: 42, name: 'Centro' },
    { id: 27, name: 'Jardim Paulista' },
    { id: 40, name: 'Jardim Bicão' }
];

const imageFiles = [
    'urban_pothole_jpg_1776123662070.png',
    'urban_trash_jpg_1776123678951.png',
    'urban_light_jpg_1776123690181.png',
    'urban_sidewalk_jpg_1776123754619.png',
    'urban_lot_jpg_1776123772549.png',
    'urban_leak_jpg_1776123788909.png'
];

const categories = [
    { title: 'Buraco na rua', desc: 'Buraco profundo causando risco aos motoristas.', imgIdx: 0 },
    { title: 'Lixo acumulado', desc: 'Muito lixo descartado incorretamente na calçada.', imgIdx: 1 },
    { title: 'Iluminação pública', desc: 'Lâmpada do poste queimada há vários dias.', imgIdx: 2 },
    { title: 'Calçada quebrada', desc: 'Calçada totalmente irregular dificultando a passagem.', imgIdx: 3 },
    { title: 'Mato alto', desc: 'Terreno abandonado com mato muito alto e insetos.', imgIdx: 4 },
    { title: 'Vazamento de água', desc: 'Vazamento constante de água tratada na via.', imgIdx: 5 },
    { title: 'Entulho na calçada', desc: 'Restos de construção bloqueando a passagem.', imgIdx: 1 },
    { title: 'Pichação em muro', desc: 'Prédio público com muitas pichações recentes.', imgIdx: 3 },
    { title: 'Bueiro entupido', desc: 'Boca de lobo obstruída por lixo e folhas.', imgIdx: 1 },
    { title: 'Problema no semáforo', desc: 'O sinal não está mudando corretamente.', imgIdx: 2 }
];

const statuses = ['Novo', 'Em andamento', 'Finalizado'];

async function run() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    
    // Ler imagens e converter para base64
    const imagesB64 = imageFiles.map(file => {
        const filePath = path.join('C:\\Users\\leonardo.anaka1\\.gemini\\antigravity\\brain\\b464c882-0fe0-4b2e-8e68-9c33baa56b7c', file);
        const data = fs.readFileSync(filePath);
        return `data:image/png;base64,${data.toString('base64')}`;
    });

    const cases = [];

    for (const bairro of neighborhoods) {
        for (let i = 0; i < 10; i++) {
            const cat = categories[i];
            cases.push({
                titulo: `${cat.title} - ${bairro.name} ${i+1}`,
                descricao: `${cat.desc} Localizado em um ponto crítico do bairro ${bairro.name}.`,
                status: 'aprovado',
                id_usuario: userId,
                id_bairro: bairro.id,
                imagem: imagesB64[cat.imgIdx % imagesB64.length],
                andamento: statuses[i % 3]
            });
        }
    }

    console.log(`Inserindo ${cases.length} casos em lotes de 5...`);

    for (let i = 0; i < cases.length; i += 5) {
        const batch = cases.slice(i, i + 5);
        console.log(`Inserindo lote ${Math.floor(i/5) + 1}...`);
        const { error } = await supabase.from('solicitacoes').insert(batch);
        if (error) {
            console.error(`Erro ao inserir lote ${Math.floor(i/5) + 1}:`, error);
        }
    }

    console.log('Processo de inserção finalizado!');
}

run();
