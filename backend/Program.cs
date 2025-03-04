using Connectify.Data;
using Connectify.Interfaces;
using Connectify.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
   options.AddPolicy("AllowAngularApp",
       builder =>
       {
           builder.WithOrigins("http://localhost:4200", "https://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
       });
});

builder.Services.AddDbContext<DataContext>(options =>
   options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddScoped<ITokenService, TokenService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
   app.UseSwagger();
   app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Apply the CORS policy
app.UseCors("AllowAngularApp");

app.UseAuthorization();

app.MapControllers();

// using var scope = app.Services.CreateScope();
// var services = scope.ServiceProvider;
// try
// {
//     var context = services.GetRequiredService<DataContext>();
//     var userManager = services.GetRequiredService<UserManager<AppUser>>();
//     //var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
//     //await context.Database.MigrateAsync();
//     //await Seed.SeedUsers(userManager, roleManager);
// }
// catch (Exception ex)
// {
//     var logger = services.GetRequiredService<ILogger<Program>>();
//     logger.LogError(ex, "An error occurred during migration");
// }

app.Run();

// using Connectify.Data;
// using Connectify.Entities;
// using Microsoft.AspNetCore.Identity;

// var builder = WebApplication.CreateBuilder(args);

// // add services to the container

// //builder.Services.AddApplicationServices(builder.Configuration);
// builder.Services.AddControllers();
// builder.Services.AddCors();
// //builder.Services.AddIdentityServices(builder.Configuration);
// builder.Services.AddSignalR();

// // Configure the HTTP request pipeline
// builder.Services.AddSwaggerGen();
// var app = builder.Build();

// //app.UseMiddleware<ExceptionMiddleware>();

// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();

// app.UseCors(x => x.AllowAnyHeader()
//     .AllowAnyMethod()
//     .AllowCredentials()
//     .WithOrigins("https://localhost:4200"));

// app.UseAuthentication();
// app.UseAuthorization();

// app.UseDefaultFiles();
// app.UseStaticFiles();

// app.MapControllers();
// //app.MapHub<PresenceHub>("hubs/presence");
// //app.MapHub<MessageHub>("hubs/message");
// //app.MapFallbackToController("Index", "Fallback");

// AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);


// await app.RunAsync();
