package no.vicx.backend.calculator;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
public class ApiController {

    // URL for testing on localhost: http://localhost:8080/api/calculator/5/10/PLUS
    private static final String CALC_TEMPLATE = "/calculator/{firstValue}/{secondValue}/{operation}";
    static final String URL_TEMPLATE = "/api" + CALC_TEMPLATE;
    static final String SECURED_URL_TEMPLATE = "/api-secured" + CALC_TEMPLATE;

    private final CalculatorService calculatorService;

    public ApiController(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @RequestMapping(
            value = {URL_TEMPLATE,SECURED_URL_TEMPLATE},
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public CalcVm index(
            @PathVariable long firstValue,
            @PathVariable long secondValue,
            @PathVariable CalculatorOperation operation) {

        return calculatorService.calculate(firstValue, secondValue, operation);
    }
}
