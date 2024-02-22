package fa.edu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class StaffController {

    @GetMapping("/admin/staff/list")
    public String getStaffPage() {
        return "staff/list";
    }
}
