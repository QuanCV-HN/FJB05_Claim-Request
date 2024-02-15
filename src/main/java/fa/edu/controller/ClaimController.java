package fa.edu.controller;

import fa.edu.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ClaimController {
    @Autowired
    StaffRepository staffRepository;
    @GetMapping("/claim/draft/{id}")
    public String DraftClaim(@PathVariable("id") Integer id) {
        staffRepository.findById(id);
        return "DraftClaim";
    }
}
