package fa.edu.repository;

import fa.edu.entities.Working;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WorkingRepository extends JpaRepository<Working,Integer> {
    List<Working> findByStaffId(Integer staffId);
}
