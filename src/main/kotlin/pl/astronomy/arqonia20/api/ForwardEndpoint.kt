package pl.astronomy.arqonia20.api

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import pl.astronomy.arqonia20.logger
import javax.servlet.http.HttpServletResponse

@RestController
class ForwardEndpoint {

    @GetMapping("/{path:[^\\.]*}")
    fun redirect(response: HttpServletResponse) {
        return response.sendRedirect("/")
    }
}
