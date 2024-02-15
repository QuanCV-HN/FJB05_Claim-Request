package fa.edu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDTO {
    private Integer id;
    private String nameProject;
    private String projectCode;
    private Date startDate;
    private Date endDate;
}
