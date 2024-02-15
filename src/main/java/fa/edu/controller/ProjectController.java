package fa.edu.controller;

import fa.edu.repository.ProjectRepository;
import fa.edu.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class ProjectController {

    @Autowired
    ProjectService projectService;


}
