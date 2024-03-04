using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using mvc_4.Models;
using System.Data.SqlClient;
using System.Data;


namespace mvc_4.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly string _connectionString = "Server=localhost,1433;Database=test;User Id=sa;Password=RPSsql12345";

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public ActionResult InsertData([FromBody] List<Person> people)
    {
        Dictionary<char, int> convertHobi = new Dictionary<char, int>
        {
            {'A', 1},
            {'B', 2},
            {'C', 3},
            {'D', 4},
            {'E', 5}
        };
        try
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                foreach (Person person in people)
                {
                    using (SqlCommand command = new SqlCommand("dbo.InsertPersonal", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        // Add parameters
                        command.Parameters.AddWithValue("@nama", person.Nama);
                        command.Parameters.AddWithValue("@idGender", person.Gender);
                        command.Parameters.AddWithValue("@idHobi", convertHobi[person.Hobi]);
                        command.Parameters.AddWithValue("@umur", person.Umur);

                        // Execute the stored procedure for each person
                        command.ExecuteNonQuery();
                    }
                }

                using (SqlCommand command = new SqlCommand("countUmur", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.ExecuteNonQuery();
                }
            }

            return Json(new { success = true });
        }
        catch (Exception ex)
        {
            return Json(new { success = false, error = ex.Message });
        }
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
