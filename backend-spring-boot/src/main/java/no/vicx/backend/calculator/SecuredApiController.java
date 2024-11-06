package no.vicx.backend.calculator;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecuredApiController {

    static final String URL_TEMPLATE = "/api-secured/calculator/{firstValue}/{secondValue}/{operation}";

    private final CalculatorService calculatorService;

    public SecuredApiController(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @RequestMapping(
            value = URL_TEMPLATE,
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public CalcVm index(
            @PathVariable long firstValue,
            @PathVariable long secondValue,
            @PathVariable CalculatorOperation operation) {

        return calculatorService.calculate(firstValue, secondValue, operation);
    }
}
