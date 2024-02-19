package fa.edu.controller;

import fa.edu.repository.ClaimRepository;
import fa.edu.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ClaimController {
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    ClaimRepository claimRepository;
    @GetMapping("/claim/draft/{id}")
    public String DraftClaim(@PathVariable("id") Integer id) {
        staffRepository.findById(id);
        return "DraftClaim";
    }
    @GetMapping("/claim/pending/{id}")
    public String pendingClaim(@PathVariable("id") Integer id) {
        staffRepository.findById(id);
        return "PendingClaim";
    }
    @GetMapping("/claim/{staffId}/approver/{id}")
    public String approveClaim(@PathVariable("id") Integer id,@PathVariable Integer staffId) {
        staffRepository.findById(staffId);
        claimRepository.findById(id);
        return "ApproverClaim";
    }
    @GetMapping("/claim/finance/{id}")
    public String FinanceClaim(@PathVariable("id") Integer id) {
        staffRepository.findById(id);
        return "Finance";
    }
    @GetMapping("/claim/financePaid/{id}")
    public String FinancePaid(@PathVariable("id") Integer id) {
        staffRepository.findById(id);
        return "FinancePaid";
    }
}
