using Expenses.Core;
using Expenses.DB;
using Microsoft.AspNet.Identity;
using NSwag.Generation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddTransient<IExpensesServices,ExpensesServices>();

builder.Services.AddTransient<IUserService,UserService>();

builder.Services.AddTransient<IPasswordHasher, PasswordHasher>();

builder.Services.AddTransient<IHttpContextAccessor,HttpContextAccessor>();

builder.Services.AddSwaggerDocument(setting =>
{
    setting.Title = "Expenses";
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("ExpensesPolicy",
        builder =>
        {
            builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

var secret = Environment.GetEnvironmentVariable("JWT_SECRET");
var issuer = Environment.GetEnvironmentVariable("JWT_ISSUER");

builder.Services.AddAuthentication(opts =>
{
    opts.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opts.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})

    .AddJwtBearer(opts =>
    {
        opts.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidIssuer = issuer,
            ValidateAudience = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret))
        };
    });



    



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



app.UseOpenApi();

app.UseCors("ExpensesPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
