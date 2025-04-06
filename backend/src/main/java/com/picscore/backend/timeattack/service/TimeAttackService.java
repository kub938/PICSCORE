package com.picscore.backend.timeattack.service;

import com.picscore.backend.timeattack.model.request.*;
import com.picscore.backend.timeattack.model.response.*;

import java.io.IOException;
import java.util.Map;

/**
 * 타임어택(TimeAttack) 관련 기능을 정의한 인터페이스입니다.
 * 구현체는 TimeAttackService 입니다.
 */
public interface TimeAttackService {

    /**
     * 주간 랭킹 정보를 페이지 단위로 조회합니다.
     *
     * @param pageNum 조회할 페이지 번호 (1부터 시작)
     * @return 랭킹 정보와 총 페이지 수를 포함하는 Map
     */
    Map<String, Object> getRanking(int pageNum);

    /**
     * 업로드한 이미지를 분석하여 주제와의 일치 여부를 평가합니다.
     *
     * @param request 이미지 및 분석 주제 정보를 담은 요청 객체
     * @return 분석 결과 (주제 이름, 신뢰도, 최종 점수 포함)
     * @throws IOException 이미지 파일 처리 중 예외 발생 시
     */
    AnalysisPhotoResponse analysisPhoto(AnalysisPhotoRequest request) throws IOException;

    /**
     * 타임어택 게임의 결과(사진, 점수 등)를 저장합니다.
     *
     * @param userId  결과를 저장할 사용자 ID
     * @param request 저장할 타임어택 정보
     */
    void saveTimeAttack(Long userId, SaveTimeAttackRequest request);
}
