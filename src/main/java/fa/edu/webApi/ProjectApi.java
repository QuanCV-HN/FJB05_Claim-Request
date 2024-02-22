package fa.edu.webApi;

import fa.edu.dto.ProjectDTO;
import fa.edu.dto.ProjectStaffDTO;
import fa.edu.dto.StaffWorkingDTO;
import fa.edu.entities.*;
import fa.edu.repository.ProjectRepository;
import fa.edu.service.ProjectService;
import fa.edu.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProjectApi {
    @Autowired
    ProjectService projectService;
    @Autowired
    StaffService staffService;
    @Autowired
    ProjectRepository projectRepository;
    @PostMapping("/api/createProject")
    public ResponseEntity<String> insertProjectAndStaff(@RequestBody ProjectStaffDTO projectStaffDTO) throws ChangeSetPersister.NotFoundException {
        Project project = projectStaffDTO.getProject();
        List<StaffWorkingDTO> staffWorkingDTOS = projectStaffDTO.getStaffs();

        project = projectService.createProject(project);

        for (StaffWorkingDTO staffDTO : staffWorkingDTOS) {
            Staff staff = staffService.getStaffById(staffDTO.getStaffId());

            Working working = new Working();
            working.setProject(project);
            working.setStaff(staff);
            working.setRoleStaff(staffDTO.getRoleStaff());
            working.setStartDate(staffDTO.getStartDate());
            working.setEndDate(staffDTO.getEndDate());

            projectService.createWorking(working);
        }
        return ResponseEntity.ok("Data inserted successfully");
    }
    @GetMapping("/api/projects/{id}")
    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable("id") int id) {
        ProjectDTO projectDTO = projectService.getProjectDTOById(id);
        if (projectDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(projectDTO);
    }
    @GetMapping("/api/project")
    public List<ProjectDTO> getAllProjects() {
        return projectService.getAll();
    }
}
