package fa.edu.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
@Entity
public class Working {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Enumerated(EnumType.STRING)
    private RoleEnum role;

    private String roleStaff;
    private Date startDate;
    private Date endDate;

    @Enumerated(EnumType.STRING)
    private RoleEnum role;

    private String roleStaff;
    private Date startDate;
    private Date endDate;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

}