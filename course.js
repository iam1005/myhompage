const courses = {
  ai: { title: "AI수처리", category: "AI · DATA PROCESSING", intro: "AI 기술을 활용해 데이터를 이해하고 처리하는 기초 역량을 기릅니다. 다양한 업무 환경에서 AI 도구를 올바르게 활용할 수 있도록 데이터의 흐름과 실습 과정을 함께 학습합니다.", goal: "AI 기반 데이터 처리의 기본 개념을 이해하고, 문제 해결에 활용할 수 있습니다.", weeks: ["AI와 데이터 처리의 이해", "데이터의 구조와 표현", "AI 도구 활용 기초", "데이터 처리 실습", "결과 해석과 활용"] },
  visualization: { title: "경영정보시각화", category: "DATA · VISUALIZATION", intro: "정보를 읽기 쉽고 설득력 있게 전달하는 데이터 시각화 방법을 학습합니다. 경영 환경에서 필요한 핵심 정보를 발견하고, 적절한 차트와 화면으로 표현하는 역량을 기릅니다.", goal: "데이터를 분석하고 목적에 맞는 시각화 결과물로 표현할 수 있습니다.", weeks: ["경영정보와 데이터 시각화", "시각화 원칙과 차트 읽기", "데이터 정리와 분석", "차트 설계 실습", "보고서와 대시보드 구성"] },
  accounting: { title: "스타트업세무전산회계", category: "STARTUP · ACCOUNTING", intro: "스타트업 운영에 필요한 세무와 전산회계의 기초를 익힙니다. 거래 기록부터 재무제표 이해까지, 창업과 경영 현장에서 필요한 회계 정보를 실무적으로 다룹니다.", goal: "기본적인 회계 처리와 세무 업무의 흐름을 이해하고 활용할 수 있습니다.", weeks: ["스타트업과 회계의 역할", "거래 기록과 증빙", "전산회계 기초", "재무제표의 이해", "세무 실무와 사례"] },
  excel: { title: "비즈니스엑셀", category: "BUSINESS · EXCEL", intro: "업무에 바로 활용할 수 있는 엑셀 기능과 데이터 처리 방법을 학습합니다. 문서 작성, 함수 활용, 데이터 분석과 시각화를 통해 효율적인 업무 수행 역량을 기릅니다.", goal: "엑셀을 이용해 업무 데이터를 정리·분석하고 효과적으로 전달할 수 있습니다.", weeks: ["엑셀 업무 환경 이해", "데이터 입력과 정리", "함수와 조건부 계산", "데이터 분석 기능", "보고서 작성과 시각화"] }
};
const key = new URLSearchParams(location.search).get("course");
const course = courses[key] || courses.ai;
document.title = `${course.title} | HONG EON JOO`;
document.querySelector("#course-title").textContent = course.title;
document.querySelector("#course-category").textContent = course.category;
document.querySelector("#course-introduction").textContent = course.intro;
document.querySelector("#course-goal").textContent = course.goal;
document.querySelector("#syllabus-list").innerHTML = course.weeks.map((week, index) => `<p><b>${String(index + 1).padStart(2, "0")}주차</b><span>${week}</span></p>`).join("");
document.querySelector("#notice-list").innerHTML = '<article class="notice-empty"><p>등록된 공지사항이 없습니다. 수업 안내는 이곳에 업데이트됩니다.</p></article>';
document.querySelectorAll(".subnav button").forEach((button) => button.addEventListener("click", () => { document.querySelectorAll(".subnav button,.tab-panel").forEach((element) => element.classList.remove("active")); button.classList.add("active"); document.querySelector(`#${button.dataset.tab}`).classList.add("active"); }));
