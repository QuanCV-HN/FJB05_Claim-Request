package fa.edu.repository;

import fa.edu.entities.ClaimRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClaimRepository extends JpaRepository<ClaimRequest,Integer> {
//    Optional<Object> findById(Integer id);
//
//    List<ClaimRequest> findAll();
//
//    void save(ClaimRequest claim);
//
//    void deleteById(Integer id);
}
