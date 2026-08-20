const code = new URLSearchParams(location.search).get('code');
const key = localStorage.flipKey || (localStorage.flipKey = crypto.randomUUID());
const $ = selector => document.querySelector(selector);
let me, clock;

async function a(action, data = {}) {
  const response = await fetch('/api/flip-game?action=' + action, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, code, key, ...data })
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.error);
  return result;
}

async function join() {
  me = (await a('join', { nickname: $('#name').value })).player;
  $('#join').hidden = true;
  $('#play').hidden = false;
  $('#team').textContent = '당신은 ' + (me.team === 'red' ? '빨강' : '파랑') + '팀입니다.';
  state();
}

async function flip() {
  try {
    await a('flip', { word: $('#word').value });
    $('#word').value = '';
    state();
  } catch (error) { alert(error.message); }
}

async function state() {
  const data = await a('state');
  const red = data.tiles.filter(tile => tile.owner === 'red').length;
  const blue = data.tiles.filter(tile => tile.owner === 'blue').length;
  const left = Math.max(0, Math.ceil((new Date(data.game.ends_at) - Date.now()) / 1000));
  $('#score').textContent = `남은 시간 ${left}초 · 빨강 ${red} : ${blue} 파랑`;
  $('#board').innerHTML = data.tiles.map(tile => `<div class="tile ${tile.owner || ''}">${tile.word}</div>`).join('');
  if (!left) {
    $('#team').textContent = '게임이 종료되었습니다.';
    $('#word').disabled = true;
    document.querySelector('#play button').disabled = true;
    return;
  }
  clearTimeout(clock);
  clock = setTimeout(state, 1000);
}
