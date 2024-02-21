package fa.edu.controller;

import fa.edu.repository.ProjectRepository;
import fa.edu.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ProjectController {

    @Autowired
    ProjectService projectService;

    @GetMapping("/projects/list")
    public String getProjectPage() {
        return "/project/list";
    }

    @GetMapping("/projects/create")
    public String getCreateProjectPage() {
        return "/project/create";
    }

    @GetMapping("/projects/edit/{id}")
    public String getEditProjectPage(@PathVariable Integer id) {
        return "/project/edit";
    }
}
