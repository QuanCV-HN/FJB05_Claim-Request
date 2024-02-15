package fa.edu.webApi;

import fa.edu.dto.StaffDTO;
import fa.edu.repository.StaffRepository;
import fa.edu.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StaffApi {
    @Autowired
    private StaffService staffService;
    @Autowired
    StaffRepository staffRepository;

    @GetMapping("/api/staff/{id}")
    public ResponseEntity<StaffDTO> getStaffById(@PathVariable Integer id) {
        try {
            StaffDTO staffDTO = staffService.getStaff(id);
            return ResponseEntity.ok(staffDTO);
        } catch (ChangeSetPersister.NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
