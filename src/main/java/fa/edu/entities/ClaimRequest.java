package fa.edu.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@Entity
public class ClaimRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String status;
    private Date createDate;
    private String Day;
    private Date fromDate;
    private Date toDate;
    private Integer totalHours;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;
}
