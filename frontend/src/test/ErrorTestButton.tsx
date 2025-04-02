import React from "react";
import * as Sentry from "@sentry/react";

const ErrorTestButton = () => {
  // 1. 일반적인 JavaScript 에러
  const triggerError = () => {
    try {
      // 존재하지 않는 함수 호출
      nonExistentFunction();
    } catch (error) {
      Sentry.captureException(error);
      alert("JavaScript 에러가 발생했습니다. Sentry에 보고되었습니다.");
    }
  };

  // 2. Promise 에러 (비동기 에러)
  const triggerPromiseError = () => {
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("비동기 작업 실패"));
      }, 100);
    }).catch((error) => {
      Sentry.captureException(error);
      alert("Promise 에러가 발생했습니다. Sentry에 보고되었습니다.");
    });
  };

  // 3. API 호출 에러 시뮬레이션
  const triggerApiError = () => {
    fetch("https://nonexistent-api-endpoint.example/data")
      .then((response) => response.json())
      .catch((error) => {
        Sentry.captureException(error);
        alert("API 호출 에러가 발생했습니다. Sentry에 보고되었습니다.");
      });
  };

  // 4. 사용자 정의 오류 메시지와 컨텍스트
  const triggerCustomError = () => {
    try {
      throw new Error("사용자 정의 에러 메시지");
    } catch (error) {
      Sentry.withScope((scope) => {
        scope.setLevel("error");
        scope.setTag("error_type", "custom_error");
        scope.setContext("additional_info", {
          userId: "test-user-123",
          action: "test-action",
          timestamp: new Date().toISOString(),
        });
        Sentry.captureException(error);
      });
      alert(
        "사용자 정의 에러가 발생했습니다. 추가 컨텍스트와 함께 Sentry에 보고되었습니다."
      );
    }
  };

  // 5. React 컴포넌트 에러 경계 테스트
  const triggerComponentError = () => {
    // React에서 컴포넌트 렌더링 중 에러 발생 시뮬레이션
    // 이 함수는 실제로 컴포넌트를 깨트리므로 주의해서 사용
    const errorComponent = document.getElementById("error-component");
    if (errorComponent) {
      errorComponent.setAttribute("data-error", "true");
      try {
        // 강제로 렌더링 에러 발생시키기
        throw new Error("React 컴포넌트 렌더링 에러");
      } catch (error) {
        Sentry.captureException(error);
        alert("React 컴포넌트 에러가 발생했습니다. Sentry에 보고되었습니다.");
      }
    }
  };

  // 6. 성능 트래킹 테스트
  const testPerformanceTracking = () => {
    const transaction = Sentry.startTransaction({
      name: "성능 테스트 트랜잭션",
      op: "test",
    });

    Sentry.configureScope((scope) => {
      scope.setSpan(transaction);
    });

    // 긴 작업 시뮬레이션
    const start = Date.now();
    while (Date.now() - start < 1000) {
      // CPU를 1초 동안 점유하는 루프
    }

    transaction.finish();
    alert("성능 테스트 트랜잭션이 Sentry에 기록되었습니다.");
  };

  return (
    <div
      className="sentry-test-panel"
      style={{
        padding: "20px",
        margin: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        maxWidth: "600px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Sentry 오류 테스트</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          onClick={triggerError}
          style={{
            padding: "10px 15px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          JavaScript 에러 발생시키기
        </button>

        <button
          onClick={triggerPromiseError}
          style={{
            padding: "10px 15px",
            backgroundColor: "#ff9800",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Promise 에러 발생시키기
        </button>

        <button
          onClick={triggerApiError}
          style={{
            padding: "10px 15px",
            backgroundColor: "#2196f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          API 호출 에러 발생시키기
        </button>

        <button
          onClick={triggerCustomError}
          style={{
            padding: "10px 15px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          컨텍스트 포함 에러 발생시키기
        </button>

        <button
          onClick={triggerComponentError}
          style={{
            padding: "10px 15px",
            backgroundColor: "#9c27b0",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          React 컴포넌트 에러 발생시키기
        </button>

        <button
          onClick={testPerformanceTracking}
          style={{
            padding: "10px 15px",
            backgroundColor: "#607d8b",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          성능 추적 테스트하기
        </button>
      </div>

      <div id="error-component"></div>
    </div>
  );
};

export default ErrorTestButton;
