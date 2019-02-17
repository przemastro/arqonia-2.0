package pl.astronomy.arqonia20.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

open class ArqoniaException(status: HttpStatus, reason: String?) : ResponseStatusException(status, reason)

class SimbadClientException(status: HttpStatus):
        ArqoniaException(status, String.format("Simbad client did not respond correctly."))

class AllIdentifiersNotFoundException(status: HttpStatus, objectName: String?):
        ArqoniaException(status, String.format("Identifiers for object name '$objectName' not found."))
