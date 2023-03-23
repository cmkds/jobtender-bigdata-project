package com.ssafy.jobtender.controller;

import com.ssafy.jobtender.dto.output.*;
import com.ssafy.jobtender.entity.Input;
import com.ssafy.jobtender.service.CompanyService;
import com.ssafy.jobtender.service.InputService;
import com.ssafy.jobtender.service.ResultService;
import com.ssafy.jobtender.service.SimilarCompanyService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/result")
public class ResultController {
    private final ResultService resultService;
    private final SimilarCompanyService similarCompanyService;
    private final CompanyService companyService;
    private final InputService inputService;

    @Autowired
    public ResultController(ResultService resultService, SimilarCompanyService similarCompanyService,
                            CompanyService companyService, InputService inputService){
        this.resultService = resultService;
        this.similarCompanyService = similarCompanyService;
        this.companyService = companyService;
        this.inputService = inputService;
    }
    /**
     * [모달 관련 API]
     * 유사한 기업 확인 : 유사한 기업 이름을 3개 반환한다.
     * @params selectedCompanyId : 선택된 기업 아이디
     * @return ComparableCompanyNameOutputDTO
     * */
    @ApiOperation(
            value = "유사한 기업 확인 API"
            , notes = "유사한 기업 이름 3개를 반환한다.")
    @GetMapping("/company/similar")
    public ResponseEntity<List<ComparableCompanyNameOutputDTO>> readComparableCompanies(@RequestParam long selectedCompanyId){
        List<ComparableCompanyNameOutputDTO> comparableCompanyNameOutputDTOList = similarCompanyService.readComparableCompanies(selectedCompanyId);
        return ResponseEntity.status(HttpStatus.OK).body(comparableCompanyNameOutputDTOList);
    }

    /**
     * [결과페이지 관련 API]
     * 키워드별 기업 확인 : 키워드 당 랜덤으로 n개의 기업을 반환한다.
     * @param resultId long : 분석 결과 아아디
     * @return List<KeywordRandomCompanyOutDto>
     * */
    @ApiOperation(
            value = "키워드별 기업 확인 API"
            , notes = "키워드 당 랜덤으로 n개의 기업을 반환한다.")
    @GetMapping("/keyword/company")
    public ResponseEntity<List<KeywordRandomCompanyOutDto>> readCompaniesByKeyword(@RequestParam long resultId){

        return null;
    }

    @ApiOperation(
            value = "분석 결과 기업 확인 API"
            , notes = "키워드로 분석된 기업 3개를 반환한다.")
    @GetMapping("/company/rank")
    public ResponseEntity<List<ResultCompanyOutDTO>> readResultsCompanies(@RequestParam("resultId") String resultId){
        List<ResultCompanyOutDTO> resultCompanyOutDTOList = this.resultService.readResultsCompanies();

        return ResponseEntity.status(HttpStatus.OK).body(resultCompanyOutDTOList);
    }

    @ApiOperation(
            value = "기업 정보 및 평점 확인 API"
            , notes = "기업 정보 및 평점을 반환한다.")
    @GetMapping("/company/info")
    public ResponseEntity<CompanyRatingOutDTO> readCompanies(@RequestParam("companyId") String companyId){
        CompanyRatingOutDTO companyRatingOutDTO = this.companyService.readCompanies(Long.parseLong(companyId));

        return ResponseEntity.status(HttpStatus.OK).body(companyRatingOutDTO);
    }
    @ApiOperation(
            value = "키워드 순위 API"
            , notes = "모든 사용자가 선택한 전체 키워드 갯수 순위를 정렬해서 반환한다.")
    @GetMapping("/keyword/top")
    public ResponseEntity<List<KeywordOutDTO>> keywordRanking(){
        List<KeywordOutDTO> keywordOutDTOs = this.inputService.keywordRanking();

        return ResponseEntity.status(HttpStatus.OK).body(keywordOutDTOs);
    }
}