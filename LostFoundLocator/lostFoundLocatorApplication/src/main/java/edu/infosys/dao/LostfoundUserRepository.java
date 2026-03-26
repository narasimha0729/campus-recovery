package edu.infosys.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.infosys.bean.LostfoundUser;

public interface LostfoundUserRepository extends JpaRepository<LostfoundUser,String> {

	@org.springframework.data.jpa.repository.Query("SELECT a from LostfoundUser a where a.role='student'")
	public java.util.List<LostfoundUser> getAllStudents();

}
