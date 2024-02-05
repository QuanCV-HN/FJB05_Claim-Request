package fa.edu.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Integer id;

    private String name;
    private String code;
    private Date startDate;
    private Date endDate;

    @OneToMany(mappedBy = "project")
    private List<ClaimRequest> claimRequests = new ArrayList<>();

}