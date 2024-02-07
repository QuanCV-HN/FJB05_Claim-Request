package fa.edu.controller;

import fa.edu.entities.ClaimRequest;
import fa.edu.repository.ClaimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ClaimController {
    @Autowired
    ClaimRepository claimRepository;

    @GetMapping(value = {"/home","/index","/","/update"})
    public  String homePage(Model model, @RequestParam(required = false) Integer id){

        ClaimRequest claim;
        if (id != null) {
            claim = claimRepository.findById(id).orElse(null);
        } else {
            claim = new ClaimRequest();
        }
        model.addAttribute("claim", claim);
        return "create";
    }
    @GetMapping("/claimManagement.html")
    public String teamManagementPage() {
        return "create";
    }
    @ModelAttribute("list")
    public List<ClaimRequest> getTeam(){
        return claimRepository.findAll();
    }

    @PostMapping("/create")
    private String create(@Validated @ModelAttribute("claim") ClaimRequest claim, BindingResult result){

        if(result.hasErrors()){
            return "create";
        }
        System.out.println(claim);
        claimRepository.save(claim);
        return "redirect:/create";
    }
    @GetMapping("/delete/{id}")
    public String delete(@PathVariable Integer id){
        claimRepository.deleteById(id);
        return "redirect:/create";
    }
}
