package fa.edu.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Integer id;
    private String nameProject;
    private String duration;
    private String roleProject;

    @OneToMany(mappedBy = "project")
    List<Staff> staff =new ArrayList<>();
}