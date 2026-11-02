const projects = [
  {id:'pink',category:'NEW FRAGRANCE DEVELOPMENT',title:'Pink Pepper & Rose',subtitle:'섬유향수 신향 개발',overview:'브랜드의 향 라인업 확장을 위한 섬유향수 신향 개발. 향의 방향성을 제품 경험으로 연결하기 위해 향료 샘플, 품평, 패키지 문안과 생산 적용 사항을 조율했습니다.',challenge:'향의 감성적 콘셉트를 실제 향료 샘플, 사용 경험, 표시 문안, 생산 사양으로 일관되게 구현하는 것.',contributions:['향료사 샘플 검토와 내부 품평 과정 조율','향 노트 및 소비자 커뮤니케이션 문구 구체화','패키지 표시 문안, 라벨 사양과 변경 사항 검토','디자인·제조사·내부 유관부서의 일정 조율'],outcome:'2026년 출시된 신향 개발에 참여했습니다. 라벨 봉합 방식 단순화를 통한 단가 절감안도 검토했습니다. 수치와 기여 범위는 공개 가능한 자료 확인 후 보강 예정입니다.'},
  {id:'gel',category:'FORMULATION RENEWAL / CUSTOMER EXPERIENCE',title:'ODOR REMOVING GEL RENEWAL',subtitle:'사용 경험을 개선한 젤탈취제 제형 리뉴얼'},
  {id:'white',category:'NEW FRAGRANCE DEVELOPMENT',title:'White Tea & Jasmine',subtitle:'건조기시트 신향 개발',overview:'화이트티 앤 자스민 향의 습식 건조기시트를 개발하며 향 품평부터 시험 항목, USP, 표시사항 검토까지 연결한 프로젝트입니다.',challenge:'감각적인 향 경험뿐 아니라 건조 후 사용감과 향 지속, 유연성, 정전기 등 제품 성능에 대한 검증 근거를 함께 준비하는 것.',contributions:['시제품 품평과 개선 의견 정리','향 지속성·유연성·정전기·탈취 관련 시험 관리','시험 진행 상태에 맞춘 USP 및 소비자 FAQ 문안 기획','수출 라벨 검토 및 유관부서 커뮤니케이션'],outcome:'제품 성능에 대한 근거 중심 커뮤니케이션을 준비했습니다. 진행 중이거나 최종 성적서 확인 전인 시험 항목은 검증 완료 성과로 표시하지 않았습니다.'},
  {id:'pine',url:'pine-green-apple.html'}
];
const dialog = document.getElementById('projectDialog');
let active = 0;
let previousFocus = null;

function openProject(index) {
  const project = projects[index];
  if (!project) return;
  if (project.url) { window.location.href = project.url; return; }
  active = index;
  if (!dialog.open) previousFocus = document.activeElement;
  document.getElementById('dialogIndex').textContent = `PROJECT / ${String(index + 1).padStart(2, '0')}`;
  const isGel = project.id === 'gel';
  dialog.classList.toggle('gel-project', isGel);
  document.getElementById('gelRenewalContent').hidden = !isGel;
  document.getElementById('standardProjectContent').hidden = isGel;
  document.getElementById('dialogFootnote').textContent = isGel
    ? 'FORMULA / PRODUCTION / CUSTOMER EXPERIENCE'
    : '공개 가능한 범위로 정리한 사례이며 일부 수치는 비공개';
  for (const field of ['Category', 'Title', 'Subtitle', 'Overview', 'Challenge', 'Outcome']) {
    document.getElementById(`dialog${field}`).textContent = project[field.toLowerCase()] || '';
  }
  document.getElementById('dialogContributions').replaceChildren(...(project.contributions || []).map(text => {
    const item = document.createElement('li'); item.textContent = text; return item;
  }));
  document.getElementById('nextProject').textContent = projects[index + 1]?.url ? 'PINE & GREEN APPLE ↗' : 'NEXT PROJECT ↗';
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.scrollTop = 0;
  document.getElementById('closeDialog').focus({preventScroll:true});
}

document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  openProject(projects.findIndex(project => project.id === button.dataset.project));
}));
document.getElementById('closeDialog').addEventListener('click', () => dialog.close());
document.getElementById('nextProject').addEventListener('click', () => openProject((active + 1) % projects.length));
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  previousFocus?.focus({preventScroll:true});
});
const progress = document.getElementById('progress');
function updateProgress() {
  const maximum = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${maximum > 0 ? scrollY / maximum * 100 : 0}%`;
}
window.addEventListener('scroll', updateProgress, {passive:true});
window.addEventListener('resize', updateProgress);
updateProgress();
const projectFromHash = projects.findIndex(project => `#project-${project.id}` === location.hash);
if (projectFromHash >= 0) openProject(projectFromHash);
