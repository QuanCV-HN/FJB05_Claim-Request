package fa.edu.controller;

import fa.edu.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class pageController {
    @Autowired
    StaffRepository staffRepository;
    @GetMapping("/claim/create/{id}")
    public String homePageClaim(@PathVariable("id") Integer id) {
        staffRepository.findById(id);
        return "createClaim";
    }
    @GetMapping("/claim/edit/{id}")
    public String EditClaim(@PathVariable("id") Integer id) {
        staffRepository.findById(id);
        return "EditClaim";
    }
}
