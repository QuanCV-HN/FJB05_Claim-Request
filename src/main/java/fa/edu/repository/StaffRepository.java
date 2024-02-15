package fa.edu.repository;

import fa.edu.entities.Staff;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StaffRepository extends JpaRepository<Staff,Integer> {
}
