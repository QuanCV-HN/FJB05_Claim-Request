package fa.edu.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Integer id;

    private String nameProject;
    private String projectCode;
    private Date startDate;
    private Date endDate;
    @OneToMany(mappedBy = "project")
    private List<Claim> claimRequests = new ArrayList<>();

    @OneToMany(mappedBy = "project")
    private List<Working> workings = new ArrayList<>();


}