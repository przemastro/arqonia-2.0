package pl.astronomy.arqonia20.exceptions

import org.springframework.dao.DuplicateKeyException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import pl.astronomy.arqonia20.logger
import java.time.Instant

@ControllerAdvice
class RestResponseEntityExceptionHandler : ResponseEntityExceptionHandler() {

    @ExceptionHandler(value = [DuplicateKeyException::class])
    protected fun handleUserExistsException(
            ex: RuntimeException, request: WebRequest): ResponseEntity<ExceptionResponse> {
        val errorMessage = "User with that name already exists."
        val status = HttpStatus.CONFLICT

        loggerInternal.warn(errorMessage + " Exception message: '${ex.message}'")

        return ResponseEntity(ExceptionResponse.fromWebRequest(request, errorMessage, status), status)
    }

    companion object {
        private val loggerInternal by logger()
    }
}

data class ExceptionResponse(
        val timestamp: Instant,
        val message: String,
        val details: String,
        val httpCodeMessage: String) {

    companion object {
        fun fromWebRequest(request: WebRequest, errorMessage: String, status: HttpStatus) = ExceptionResponse(
                Instant.now(),
                errorMessage,
                request.getDescription(false),
                status.reasonPhrase
        )
    }
}
