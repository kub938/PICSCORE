package com.picscore.backend.timeattack.controller;

import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.timeattack.model.request.AnalysisPhotoRequest;
import com.picscore.backend.timeattack.model.request.SaveTimeAttackRequest;
import com.picscore.backend.timeattack.model.response.AnalysisPhotoResponse;
import com.picscore.backend.timeattack.service.TimeAttackService;
import com.picscore.backend.user.service.OAuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * TimeAttack 관련 API를 처리하는 컨트롤러
 */
@RestController
@RequestMapping("/api/v1/activity")
@RequiredArgsConstructor
public class TimeAttackController {

    private final TimeAttackService timeAttackService;
    private final OAuthService oAuthService;


    /**
     * TimeAttack 랭킹을 조회하는 API 엔드포인트
     *
     * @param pageNum 조회할 페이지 번호 (1부터 시작)
     * @return ResponseEntity<BaseResponse<Map<String, Object>>> 랭킹 정보를 포함한 응답
     */
    @GetMapping("/time-attack/{pageNum}")
    public ResponseEntity<BaseResponse<Map<String, Object>>> getRanking(
            @PathVariable int pageNum
    ) {
        // TimeAttackService의 getRanking 메소드를 호출하여 랭킹 정보를 조회하고 반환
        return timeAttackService.getRanking(pageNum);
    }


    /**
     * 사진 분석 요청을 처리하는 API 엔드포인트
     *
     * @param request AnalysisPhotoRequest 객체 (사진 분석 요청 데이터)
     * @return ResponseEntity<BaseResponse<AnalysisPhotoResponse>> 분석 결과 응답
     * @throws IOException 파일 처리 중 발생할 수 있는 입출력 예외
     */
    @PostMapping(value = "/analysis", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse<AnalysisPhotoResponse>> analysisPhoto(
            @ModelAttribute AnalysisPhotoRequest request
    ) throws IOException {
        // 사진 분석 서비스 호출 및 결과 반환
        return timeAttackService.analysisPhoto(request);
    }


    /**
     * timeAttack 데이터를 저장하는 API 엔드포인트
     *
     * @param request HttpServletRequest 객체 (사용자 인증 정보를 포함)
     * @param saveTimeAttackRequest SaveTimeAttackRequest 객체 (저장할 timeAttack 데이터)
     * @return ResponseEntity<BaseResponse<HttpStatus>> 저장 결과 응답
     */
    @PostMapping("/save")
    public ResponseEntity<BaseResponse<HttpStatus>> saveTimeAttack(
            HttpServletRequest request,
            @RequestBody SaveTimeAttackRequest saveTimeAttackRequest
    ) {
        // 사용자 닉네임을 기반으로 사용자 ID 조회
        Long userId = oAuthService.findIdByNickName(request);

        // 시간 공격 데이터 저장 서비스 호출 및 결과 반환
        return timeAttackService.saveTimeAttack(userId, saveTimeAttackRequest);
    }
}

