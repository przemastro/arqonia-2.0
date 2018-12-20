package pl.astronomy.arqonia20.domain.user

interface UserRepository {
    fun save(user: User)
    fun findByUsername(username: String): User
}