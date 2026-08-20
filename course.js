const courses = {
  ai: { title: "AI수처리", category: "AI · DATA PROCESSING", intro: "AI 기술을 활용해 데이터를 이해하고 처리하는 기초 역량을 기릅니다. 다양한 업무 환경에서 AI 도구를 올바르게 활용할 수 있도록 데이터의 흐름과 실습 과정을 함께 학습합니다.", goal: "AI 기반 데이터 처리의 기본 개념을 이해하고, 문제 해결에 활용할 수 있습니다.", weeks: ["AI와 데이터 처리의 이해", "데이터의 구조와 표현", "AI 도구 활용 기초", "데이터 처리 실습", "결과 해석과 활용"] },
  visualization: { title: "경영정보시각화", category: "DATA · VISUALIZATION", intro: "정보를 읽기 쉽고 설득력 있게 전달하는 데이터 시각화 방법을 학습합니다. 경영 환경에서 필요한 핵심 정보를 발견하고, 적절한 차트와 화면으로 표현하는 역량을 기릅니다.", goal: "데이터를 분석하고 목적에 맞는 시각화 결과물로 표현할 수 있습니다.", weeks: ["경영정보와 데이터 시각화", "시각화 원칙과 차트 읽기", "데이터 정리와 분석", "차트 설계 실습", "보고서와 대시보드 구성"] },
  accounting: { title: "스타트업세무전산회계", category: "STARTUP · ACCOUNTING", intro: "스타트업 운영에 필요한 세무와 전산회계의 기초를 익힙니다. 거래 기록부터 재무제표 이해까지, 창업과 경영 현장에서 필요한 회계 정보를 실무적으로 다룹니다.", goal: "기본적인 회계 처리와 세무 업무의 흐름을 이해하고 활용할 수 있습니다.", weeks: ["스타트업과 회계의 역할", "거래 기록과 증빙", "전산회계 기초", "재무제표의 이해", "세무 실무와 사례"] },
  excel: { title: "비즈니스엑셀실무", category: "BUSINESS · EXCEL", intro: "업무에 바로 활용할 수 있는 엑셀 기능과 데이터 처리 방법을 학습합니다. 문서 작성, 함수 활용, 데이터 분석과 시각화를 통해 효율적인 업무 수행 역량을 기릅니다.", goal: "엑셀을 이용해 업무 데이터를 정리·분석하고 효과적으로 전달할 수 있습니다.", weeks: ["엑셀 업무 환경 이해", "데이터 입력과 정리", "함수와 조건부 계산", "데이터 분석 기능", "보고서 작성과 시각화"] }
};
const key = new URLSearchParams(location.search).get("course");
const courseKey = courses[key] ? key : "ai";
const course = courses[courseKey];
document.title = `${course.title} | HONG EON JOO`;
document.querySelector("#course-title").textContent = course.title;
document.querySelector("#course-category").textContent = course.category;
document.querySelector("#course-introduction").textContent = course.intro;
document.querySelector("#course-goal").textContent = course.goal;
const dashboard = document.querySelector("#sales-dashboard");
if (courseKey === "visualization" && window.salesDashboardData) {
  const data = window.salesDashboardData;
  const won = (value) => `${(value / 100000000).toFixed(1)}억 원`;
  const number = new Intl.NumberFormat("ko-KR");
  const highest = (items) => Math.max(...items.map((item) => item.sales));
  dashboard.hidden = false;
  document.querySelector("#dashboard-metrics").innerHTML = [
    ["총매출", won(data.summary.sales), "24개월 누적"], ["판매 수량", `${number.format(data.summary.quantity)}개`, "전 상품 합계"],
    ["판매 건수", `${number.format(data.summary.orders)}건`, "분석 대상 거래"], ["분석 기간", `${data.summary.days}일`, "2024.01 — 2025.12"]
  ].map(([label, value, note]) => `<div class="metric"><small>${label}</small><strong>${value}</strong><span>${note}</span></div>`).join("");
  const monthly = [...data.monthly].sort((a, b) => a.label.localeCompare(b.label));
  const maxMonth = highest(monthly);
  document.querySelector("#monthly-chart").innerHTML = monthly.map((item) => `<div class="month-bar"><div class="bar-track"><i style="height:${Math.max(7, item.sales / maxMonth * 100)}%" title="${item.label} ${won(item.sales)}"></i></div><span>${item.label.slice(5)}월</span></div>`).join("");
  const ranked = (items, target) => {
    const max = highest(items);
    document.querySelector(target).innerHTML = items.map((item) => `<div class="rank-row"><div><span>${item.label}</span><b>${won(item.sales)}</b></div><i><em style="width:${item.sales / max * 100}%"></em></i></div>`).join("");
  };
  ranked(data.category, "#category-chart");
  ranked([...data.time].sort((a, b) => a.label.localeCompare(b.label)), "#time-chart");
  const maxAge = highest(data.age);
  document.querySelector("#age-chart").innerHTML = data.age.map((item) => `<div class="age-row"><span>${item.label}</span><i><em style="width:${item.sales / maxAge * 100}%"></em></i><b>${won(item.sales)}</b></div>`).join("");
}
document.querySelector("#syllabus-list").innerHTML = course.weeks.map((week, index) => `<p><b>${String(index + 1).padStart(2, "0")}주차</b><span>${week}</span></p>`).join("");
if (courseKey === "ai") {
  document.querySelector("#course-dashboard").innerHTML = `<section class="dashboard-embed"><div class="dashboard-heading"><div><small>AI DATA DASHBOARD</small><h3>AI수처리 대시보드</h3></div><a href="https://script.google.com/macros/s/AKfycbxLmeCTtryxdcgNBEY2gV4KEuAlB2-2_swZxO1tuGMjbtq2Z97WMIjuPcAOBmcpihn_aw/exec" target="_blank" rel="noopener noreferrer">새 창으로 보기 ↗</a></div><iframe title="AI수처리 대시보드" src="https://script.google.com/macros/s/AKfycbxLmeCTtryxdcgNBEY2gV4KEuAlB2-2_swZxO1tuGMjbtq2Z97WMIjuPcAOBmcpihn_aw/exec" loading="lazy"></iframe></section>`;
}
const noticeList = document.querySelector("#notice-list");
async function loadNotices() {
  noticeList.innerHTML = '<article class="notice-empty"><p>공지사항을 불러오는 중입니다.</p></article>';
  const { data, error } = await window.supabaseClient.from("notices").select("title, body, published_at").eq("course", courseKey).eq("is_published", true).order("published_at", { ascending: false });
  if (error) { noticeList.innerHTML = '<article class="notice-empty"><p>등록된 공지사항이 없습니다. 수업 안내는 이곳에 업데이트됩니다.</p></article>'; return; }
  if (!data.length) { noticeList.innerHTML = '<article class="notice-empty"><p>등록된 공지사항이 없습니다. 수업 안내는 이곳에 업데이트됩니다.</p></article>'; return; }
  noticeList.innerHTML = data.map((notice) => `<article><div><h3>${escapeHtml(notice.title)}</h3>${notice.body ? `<p>${escapeHtml(notice.body).replace(/\\n/g, "<br>")}</p>` : ""}</div><time>${new Date(notice.published_at).toLocaleDateString("ko-KR")}</time></article>`).join("");
}
function escapeHtml(value) { const div = document.createElement("div"); div.textContent = value; return div.innerHTML; }
loadNotices();
document.querySelectorAll(".subnav button").forEach((button) => button.addEventListener("click", () => { document.querySelectorAll(".subnav button,.tab-panel").forEach((element) => element.classList.remove("active")); button.classList.add("active"); document.querySelector(`#${button.dataset.tab}`).classList.add("active"); }));
