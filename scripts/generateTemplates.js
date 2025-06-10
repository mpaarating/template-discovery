// scripts/generateTemplates.js
import { readFileSync, writeFileSync } from 'fs';
import { faker } from '@faker-js/faker';

const small = JSON.parse(readFileSync('./src/data/templates.json', 'utf8'));
const big = [];

for (let i = 0; i < 2000; i++) {
  const base = small[i % small.length];
  big.push({
    ...base,
    id: `${base.id}-${i}`,
    title: `${base.title} #${i}`,
    popularity_score: Math.floor(Math.random() * 100),
    setup_time_minutes: Math.floor(Math.random() * 60) + 1,
    created_at: faker.date.past().toISOString(),
  });
}

writeFileSync('./src/data/templates.large.json', JSON.stringify(big, null, 2));
console.log('Generated', big.length, 'templates');
