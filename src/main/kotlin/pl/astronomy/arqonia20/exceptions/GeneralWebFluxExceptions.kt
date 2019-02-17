package pl.astronomy.arqonia20.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

open class ArqoniaException(status: HttpStatus, reason: String?) : ResponseStatusException(status, reason)

class SimbadClientException(status: HttpStatus):
        ArqoniaException(status, "Simbad client did not respond correctly.")

class AllIdentifiersNotFoundException(status: HttpStatus, objectName: String):
        ArqoniaException(status, "Identifiers for object name '$objectName' not found.")

class VizierClientException(status: HttpStatus):
        ArqoniaException(status, "Vizier client did not respond correctly.")

class ObjectNotFoundException(status: HttpStatus, tableName: String, identifier: String):
        ArqoniaException(status, "Object in table '$tableName' and with identifier '$identifier' not found.")
