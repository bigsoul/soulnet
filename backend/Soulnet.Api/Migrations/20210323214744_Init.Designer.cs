﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Soulnet.Data;

namespace Soulnet.Api.Migrations
{
    [DbContext(typeof(SoulnetContext))]
    [Migration("20210323214744_Init")]
    partial class Init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("Soulnet.Model.Entity.Dataset", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<bool>("IsLoaded")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(false);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.HasKey("Id");

                    b.ToTable("Dataset");
                });

            modelBuilder.Entity("Soulnet.Model.Entity.Learning", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("DatasetId")
                        .HasColumnType("uuid");

                    b.Property<int>("DeepLayersCount")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasDefaultValue(0);

                    b.Property<int>("InputNeuronsCount")
                        .HasColumnType("integer");

                    b.Property<bool>("IsArchive")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(false);

                    b.Property<int>("IterationCount")
                        .HasColumnType("integer");

                    b.Property<int>("IterationCurrent")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasDefaultValue(0);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<int>("State")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasDefaultValue(0);

                    b.Property<Guid>("TestingId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("DatasetId")
                        .IsUnique();

                    b.HasIndex("TestingId")
                        .IsUnique();

                    b.ToTable("Learning");
                });

            modelBuilder.Entity("Soulnet.Model.Entity.Testing", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("DatasetId")
                        .HasColumnType("uuid");

                    b.Property<float>("EndDeposit")
                        .HasColumnType("real");

                    b.Property<bool>("IsArchive")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(false);

                    b.Property<int>("IterationCount")
                        .HasColumnType("integer");

                    b.Property<int>("IterationCurrent")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasDefaultValue(0);

                    b.Property<Guid>("LearningId")
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<float>("StartDeposit")
                        .HasColumnType("real");

                    b.Property<int>("State")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasDefaultValue(0);

                    b.Property<float>("StopLossPercent")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("DatasetId")
                        .IsUnique();

                    b.ToTable("Testing");
                });

            modelBuilder.Entity("Soulnet.Model.Entity.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("character varying(60)");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("character varying(60)");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Soulnet.Model.Entity.Learning", b =>
                {
                    b.HasOne("Soulnet.Model.Entity.Dataset", "Dataset")
                        .WithOne("Learning")
                        .HasForeignKey("Soulnet.Model.Entity.Learning", "DatasetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Soulnet.Model.Entity.Testing", "Testing")
                        .WithOne("Learning")
                        .HasForeignKey("Soulnet.Model.Entity.Learning", "TestingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Dataset");

                    b.Navigation("Testing");
                });

            modelBuilder.Entity("Soulnet.Model.Entity.Testing", b =>
                {
                    b.HasOne("Soulnet.Model.Entity.Dataset", "Dataset")
                        .WithOne("Testing")
                        .HasForeignKey("Soulnet.Model.Entity.Testing", "DatasetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Dataset");
                });

            modelBuilder.Entity("Soulnet.Model.Entity.Dataset", b =>
                {
                    b.Navigation("Learning");

                    b.Navigation("Testing");
                });

            modelBuilder.Entity("Soulnet.Model.Entity.Testing", b =>
                {
                    b.Navigation("Learning");
                });
#pragma warning restore 612, 618
        }
    }
}