
const original = { name: 'Knox', km: 2.8 };
const alias = original;
const copy = { ...original };

alias.km = 99;
copy.km = 1;

const outer = { name: 'X', meta: { tags: ['steep'] } };
const shallow = { ...outer };

shallow.meta.tags.push('rocky');


console.log({ x: 1 } === { x: 1 });

