CREATE PROCEDURE InsertPersonal
  @nama NVARCHAR(100),
  @idGender INT,
  @idHobi INT,
  @umur INT
AS
BEGIN
  INSERT INTO dbo.tbIT_Personal (nama, idGender, idHobi, umur)
  VALUES (@nama, @idGender, @idHobi, @umur);
END